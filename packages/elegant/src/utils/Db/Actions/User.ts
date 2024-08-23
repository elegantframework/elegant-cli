'use server'

import prisma from "@/utils/Prisma";

export interface CreateUser {

};

export async function createUser(user: CreateUser) {
    try {
        const response = await prisma.user.create({
            data: user
        });

        return response;
    } 
    catch (error: any) {
        return {
            error: error.message,
        };
    }
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

export async function updateUser(
    value: string,
    id: string,
    key: string,
  ) {  
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