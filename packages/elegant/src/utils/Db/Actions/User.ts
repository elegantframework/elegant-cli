'use server'

import { hashPassword } from "@/utils/Auth/Bcrypt";
import { getSession, signIn } from "@/utils/Auth/Auth";
import prisma from "@/utils/Db/Prisma";
import { revalidateTag } from "next/cache";

export interface createAdmin {
  name: string;
  email: string;
  password: string;
};

// export async function createAdmin(user: createAdmin) {
//   try {
//       await prisma.user.create({
//           data: {
//               name: user.name,
//               email: user.email,
//               password: await hashPassword(user.password),
//               role: "admin",
//           }
//       });

//       const response = await signIn('credentials', user);

//       return response;
//   } 
//   catch (error: any) {
//       return {
//           error: error.message,
//       };
//   }
// }

export async function createRootAdmin(user: createAdmin) {
  try {
      const savedUser = await prisma.$transaction(async(tx) => {
        const site = await tx.site.create({
          data: {
            domain: process.env.NEXT_PUBLIC_APP_URL || ""
          }
        });

        return await tx.user.create({
          data: {
            name: user.name,
            email: user.email,
            password: await hashPassword(user.password),
            role: "root_admin",
            activeSiteId: site.id
          },
        });
      });

      const response = (
        savedUser.id ? await signIn('credentials', user) : null
      )

      await revalidateTag(
        `${savedUser.activeSiteId}.${process.env.NEXT_PUBLIC_APP_URL || ""}-metadata`,
      );

      return response;
  } 
  catch (error: any) {
      return {
          error: error.message,
      };
  }
}

export async function getUser(
  email: string
) {
  const response = await prisma.user.findUnique({
      where: {
          email: email            
      }
  });

  return response;
}

export async function getUserById(id: string) {
    const response = await prisma.user.findUnique({
        select: {
            name: true,
            image: true,
            twitterHandle: true
        },
        where: {
            id: id,
        }   
    });

    return response;
}

export async function getAdminCount() {
  const response = await prisma.user.findMany({
      where: {
          role: "root_admin"            
      }
  });

  return response.length;
}

export async function updateUser(
    value: string,
    id: string,
    key: string,
  ) {  
    const session = await getSession();
    if (!session?.user?.id) {
      return {
        error: "Not authenticated",
      };
    }

    try {
      const response = await prisma.user.update({
        select: {
            name: true,
            image: true,
            twitterHandle: true
        },
        where: {
          id: id,
        },
        data: {
          [key]: value,
        },
      });
      return response;
    } catch (error: any) {
      if (error.code === "P2002") {
        return {
          error: `This ${key} is already in use`,
        };
      } else {
        return {
          error: error.message,
        };
      }
    }
};

export interface logUserIn {
  email: string;
  password: string;
};

export async function logUserIn(user: logUserIn) {
  try {
      const response = await signIn('credentials', user);

      return response;
  } 
  catch (error: any) {
      return {
          error: error.message,
      };
  }
}