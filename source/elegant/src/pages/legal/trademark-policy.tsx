import LegalLayout from "@/components/Layouts/LegalLayout";
import Seo from "@/components/Seo/Seo";
import MetaTitle from "@/utils/Meta/MetaTitle";
import Config from 'Config';
import Link from "next/link";

/**
 * A standard boiler plate trademark policy page.
 * @returns An html page for displaying a standard trademark policy to users.
 */
const TrademarkPolicyPage = () => {
    return(
        <LegalLayout>
            <Seo 
                title={`Trademark Policy - ${MetaTitle(Config('app.name'), Config('app.tagline'))}`}
                description={'See our trademark policy and how it relates to you.'}
            />
            <div className="px-4 sm:px-6 md:px-8 relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32 pb-20 sm:pb-24 lg:pb-32">
                <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white" 
                    id="trademark-policy"
                >
                    <p>Trademark Policy</p>
                </h1>
            </div>
            <ul role="list" 
                className="list-disc"
            >
                <li className="pb-2">
                    <Link href="#ownership-and-usage">
                        Ownership and Usage
                    </Link>
                </li>
                <li className="pb-2">
                    <Link href="#permissible-use">
                        Permissible Use
                    </Link>
                </li>
                <li className="pb-2">
                    <Link href="#restricted-use">
                        Restricted Use
                    </Link>
                </li>
                <li className="pb-2">
                    <Link href="#enforcement">
                        Enforcement
                    </Link>
                </li>
                <li className="pb-2">
                    <Link href="#reporting-unauthorized-use">
                        Reporting Unauthorized Use
                    </Link>
                </li>
                <li className="pb-2">
                    <Link href="#modifications-to-the-policy">
                        Modifications to the Policy
                    </Link>
                </li>
            </ul>
            <p className="pt-10 pb-5">
                Last Updated: 27th of May, 2023
            </p>
            <p className="pb-5">
                The following policy outlines the guidelines and restrictions for the use of trademarks owned by <b>{Config('app.name')}</b> ("we" or "our"). By using any of our trademarks, you agree to comply with this policy.
            </p>
            <h2 id="ownership-and-usage" 
                className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 md:text-3xl pt-5 pb-5"
            >
                <p>Ownership and Usage</p>
            </h2>
            <p className="pb-5">
                All trademarks, logos, service marks, and trade names displayed on our website, applications, or other materials ("Marks") are the property of <b>{Config('app.name')}</b> or their respective owners. The Marks are protected by trademark laws and international treaties. You may not use any of our Marks without obtaining prior written permission from us or the respective owner, as applicable.
            </p>
            <h2 id="permissible-use" 
                className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 md:text-3xl pt-5 pb-5"
            >
                <p>Permissible Use</p>
            </h2>
            <p className="pb-5">
                We encourage and appreciate the proper use of our Marks to promote and identify our products and services. You may use our Marks for the following purposes, subject to compliance with this policy and any specific guidelines we provide:
            </p>
            <ul role="list" 
                className="list-disc"
            >
                <li className="pb-4">
                    <b>Descriptive References</b>: You may refer to our products or services using our Marks to accurately describe or identify them.
                </li>
                <li className="pb-4">
                    <b>Compatibility Statements</b>: You may use our Marks to indicate compatibility or interoperability with our products or services, provided that such use is accurate and not misleading.
                </li>
                <li className="pb-4">
                    <b>Non-Commercial Fair Use</b>: You may use our Marks in non-commercial contexts for purposes such as news reporting, commentary, or parody, as long as it does not suggest endorsement or affiliation with us.
                </li>
            </ul>
            <h2 id="restricted-use" 
                className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 md:text-3xl pt-5 pb-5"
            >
                <p>Restricted Use</p>
            </h2>
            <p className="pb-5">
                The following uses of our Marks are strictly prohibited:
            </p>
            <ul role="list" 
                className="list-disc"
            >
                <li className="pb-4">
                    <b>Unauthorized Modification</b>: You may not modify or alter our Marks in any way without our prior written consent.               
                 </li>
                <li className="pb-4">
                    <b>Confusingly Similar Marks</b>: You may not use Marks that are confusingly similar to ours or may cause confusion or dilution of our Marks.
                </li>
                <li className="pb-4">
                    <b>False Endorsement</b>: You may not use our Marks in a manner that implies or suggests endorsement, sponsorship, or affiliation with us, without our explicit permission.
                </li>
                <li className="pb-4">
                    <b>Domain Names</b>: You may not register or use domain names that include our Marks or variations thereof without our prior written consent.
                </li>
                <li className="pb-4">
                    <b>Trademark as Company Name</b>: You may not use our Marks as part of your company name, product name, service name, or any similar identification.
                </li>
            </ul>
            <h2 id="enforcement" 
                className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 md:text-3xl pt-5 pb-5"
            >
                <p>Enforcement</p>
            </h2>
            <p className="pb-5">
                We reserve the right to take appropriate action to enforce our trademark rights and protect the integrity of our Marks. Such actions may include, but are not limited to, legal proceedings, takedown notices, and suspension of services.
            </p>
            <h2 id="reporting-unauthorized-use" 
                className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 md:text-3xl pt-5 pb-5"
            >
                <p>Reporting Unauthorized Use</p>
            </h2>
            <p className="pb-5">
                If you become aware of any unauthorized use of our Marks or have any questions regarding their usage, please contact us at <b>{Config('app.contact_email')}</b>.
            </p>
            <h2 id="modifications-to-the-policy" 
                className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 md:text-3xl pt-5 pb-5"
            >
                <p>Modifications to the Policy</p>
            </h2>
            <p className="pb-5">
                We reserve the right to modify this trademark policy at any time without prior notice. The updated policy will be effective upon posting on our website. We encourage you to review this policy periodically for any changes.
            </p>
            <p className="pb-5">
                This policy is not a license or authorization for you to use our Marks, except as explicitly stated herein or with our prior written permission.
            </p>
        </LegalLayout>
    );
};

export default TrademarkPolicyPage;