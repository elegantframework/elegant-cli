import { Steps } from '@/components/Steps';
import view_domains from '@/img/docs/Vercel.com-ViewDomains.png'
import vercel_domains_page from '@/img/docs/Vercel.com-DomainsPage.png';
import vercel_domain_config from '@/img/docs/Vercel.com-DomainConfig.png';
import vercel_domain_success from '@/img/docs/Vercel.com-DomainSuccess.png';

/**
 * Our custom domain steps for the deployment guide
 * @returns A styled list of directions complete with screenshots
 */
const CustomDomainSteps = () => {
    // set up our doc steps
    let steps = [
        {
            title: 'Navigate to your project',
            body: () => (
                <p>
                    Navigate to your project within the Vercel.com dashboard.
                    On the overview page of your Vercel project, click the "View Domains" button on the right side of the page.
                </p>
            ),
            image: {
                title: "Add your custom domain to your Elegant project",
                src: view_domains.src
            }
        },
        {
            title: 'Enter your custom domain name',
            body: () => (
              <p>
                Enter your custom domain name into the text field and click "Add".
              </p>
            ),
            image: {
                title: "Enter your custom domain name for your Elegant project",
                src: vercel_domains_page.src
            }
        },
        {
            title: 'Complete any instructions provided to you by Vercel',
            body: () => (
              <p>
                Follow any instructions provided to you by Vercel to finish setting up your custom domain.
              </p>
            ),
            image: {
                title: "Verify the Vercel project settings",
                src: vercel_domain_config.src
            }
        },
        {
            title: 'Wait for Vercel to verify your configuration settings',
            body: () => (
              <>
                <p>
                    Once the domain configuration settings are set up correctly, you will no longer see an invalid message. Instead you will see a "Valid Configuration" message with the option to view your live domain. 
                </p>
              </>
            ),
            image: {
                title: "Wait for your custom domain configuration settings to be verified",
                src: vercel_domain_success.src
            }
        }
    ];

    return(
        <Steps intro={null} level={4} steps={steps} code={null} />
    );   
};

export default CustomDomainSteps;