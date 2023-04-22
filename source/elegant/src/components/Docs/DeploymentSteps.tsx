import { Steps } from '@/components/Steps';
import vercel_dashboard from '@/img/docs/Vercel.com-Dashboard.png'
import vercel_project from '@/img/docs/Vercel.com-CreateNewProject.png';
import vercel_configuration from '@/img/docs/Vercel.com-ConfigureProject.png';
import vercel_deployment_success from '@/img/docs/Vercel.com-DeploymentSuccess.png';

/**
 * Our deployment steps for the deployment guide
 * @returns A styled list of directions complete with screenshots
 */
const DeploymentSteps = () => {

    // set up our doc steps
    let steps = [
        {
            title: 'Create a New Project',
            body: () => (
                <p>
                    Click "Create a New Project" inside of the Vercel dashboard.
                </p>
            ),
            image: {
                title: "Vercel.com Dashboard",
                src: vercel_dashboard.src
            }
        },
        {
            title: 'Select your Elegant application',
            body: () => (
              <p>
                Select the Elegant application that you would like to deploy to Vercel.
              </p>
            ),
            image: {
                title: "Select your Elegant project to deploy to Vercel.com",
                src: vercel_project.src
            }
        },
        {
            title: 'Verify the configuration settings for your application',
            body: () => (
              <p>
                You can skip setting environment variables for now. We will configure the environment variables in a later step.
              </p>
            ),
            image: {
                title: "Verify the Vercel project settings",
                src: vercel_configuration.src
            }
        },
        {
            title: 'Click Deploy',
            body: () => (
              <>
                <p>
                    Wait for the build and deployment steps to complete.
                </p>
                <p>
                    If you into any issues during deployment, you can inspect the build console output to troubleshoot and resolve any deployment errors.
                </p>
              </>
            ),
            image: {
                title: "Click deploy to launch your Elegant application",
                src: vercel_deployment_success.src
            }
        }
    ];

    return(
        <Steps intro={null} level={4} steps={steps} code={null} />
    );   
};

export default DeploymentSteps;