--- Temp guide to how to host elegant docs

List each step as Step 1: Step 2:

We use Vercel --- 

Vercel is an end-to-end platform for developers, that allows you to create and deploy your web application.

- Create an account at Vercel.com if you don't have one

Sign up

To sign up for Vercel, go to https://vercel.com/signup. You can choose to authenticate either with a Git provider or by using an email. When using email authentication, you may need to confirm both your email address and a phone number.



Creating & Deploying Your Project

Once you have successfully signed up for Vercel and connected your Git provider, you're ready to start creating a Project.


Click create a new project


Select the Elegant docs project that you would like to deploy.

Verify the configuration settings

Skip the env vars for now, we will set those in another step when we configure our domain.

Click Deploy


Wait for the build and deployment steps to complete. Inspect the build console output to troubleshoot and resolve any deployment errors.



How to connect your domain to Vercel.

  Go to your project on the Vercel platform. In the Overview tab of your Vercel project, click on the “View Domains” button.

    Type your domain name in and click add

    - Follow any instructions provided by Vercel to finish setting up your domain


Once the configuration is set up correctly, you will no longer see the invalid message and instead you will see “Valid Configuration” and the redirect to your domain.



    - Configuring vercel
        - you have to set up your domain


