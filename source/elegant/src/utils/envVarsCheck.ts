import Config from 'Config';

export type EnvVarsType = {
  required: {
    [key: string]: boolean
  }
  optional: {
    [key: string]: boolean
  }
}

type EnvVarsObjType = {
  hasMissingEnvVars: boolean
  envVars: EnvVarsType
}

const initialEnvVars: EnvVarsType = {
  required: {
    NEXT_PUBLIC_CMS_GITHUB_ID: false,
    NEXT_PUBLIC_CMS_GITHUB_SECRET: false,
    NEXT_PUBLIC_CMS_TOKEN_SECRET: false,
    NEXT_PUBLIC_CMS_REPOSITORY_SLUG: false,
    NEXT_PUBLIC_CMS_REPOSITORY_OWNER: false
  },
  optional: {
    NEXT_PUBLIC_CMS_CONTENT_PATH: false,
  }
}

export const envVars = (function () {
  const envVarsObj: EnvVarsObjType = {
    hasMissingEnvVars: false,
    envVars: {
      required: {},
      optional: {}
    }
  }

  // The repo slug takes precedence over VERCEL_GIT_REPO_SLUG,
  // if both are empty, then we default to asking for the repo slug
  if (Config('admin.cms_repository_slug')) {
    initialEnvVars.required.NEXT_PUBLIC_CMS_REPOSITORY_SLUG = true
  } else if (process.env.VERCEL_GIT_REPO_SLUG) {
    initialEnvVars.required.VERCEL_GIT_REPO_SLUG = true
  } else {
    initialEnvVars.required.NEXT_PUBLIC_CMS_REPOSITORY_SLUG = false
  }

  Object.entries(initialEnvVars.required).forEach(([key]) => {
    envVarsObj.envVars.required[key] = !!process.env[key]

    if (!process.env[key]) {
      envVarsObj.hasMissingEnvVars = true
    }
  })

  Object.entries(initialEnvVars.optional).forEach(([key]) => {
    envVarsObj.envVars.optional[key] = !!process.env[key]
  })

  return envVarsObj
})()
