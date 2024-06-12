import { Session } from "next-auth";
import DashboardLayout from "../DashboardLayout";

export default function NewCollection({
    session
}:{
    session: Session | null
}) {
    return(
    <DashboardLayout session={session}>
        <div className="flex max-w-screen-xl flex-col space-y-12 p-5 md:p-8">
            <div className="mt-16 md:mt-8 md:mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
                <div className="flex items-center gap-x-6">
                    <h2 className="text-lg font-semibold leading-7 text-gray-900">New Collection</h2>
                </div>
            </div>
            <div>
                <form>
                    <div className="space-y-12">
                        <div className="">
                            <div className="mt-10 grid grid-cols-1 gap-y-8 sm:grid-cols-4">
                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="collection_name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Collection Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="collection_name"
                                            name="collection_name"
                                            type="text"
                                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            defaultValue={''}
                                            placeholder="Ex: Posts"
                                        />
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-gray-600">Use the plural form of the collection name, ex: Docs.</p>
                                </div>
                                <div className="sm:col-span-1">
                                    <button
                                        type="submit"
                                        className="mr-2 mb-2 mt-[26px] ml-4 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-indigo-300 dark:focus:ring-offset-indigo-900 dark:focus:ring-indigo-700 cursor-pointer"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </DashboardLayout>
    );
}