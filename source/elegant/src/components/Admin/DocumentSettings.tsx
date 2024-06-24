import Accordion from "./Accordion";

export default function DocumentSettings() {
    return(
        <aside className="md:w-64 lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:overflow-y-auto lg:border-l">
            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Date
                </label>
                <div className="mt-2">
                    <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="you@example.com"
                    />
                </div>
            </div>
            <div className="w-full">
                <Accordion title="Author">
                    Hey
                </Accordion>
                <Accordion title="URL Slug">
                    There
                </Accordion>
                <Accordion title="Description">
                    Now
                </Accordion>
                <Accordion title="Cover Image">
                    and again
                </Accordion>
                <Accordion title="Tags">
                    tags
                    {/* {newTags.map((tag) => (
                        <span 
                        className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 mr-2"
                        key={`${tag}-tag`}
                        >
                        {tag}
                        <button 
                            className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20"
                            onClick={() => {
                            setNewTags(
                                newTags.filter(e => e !== tag)
                            );

                            editDocument('tags', newTags.filter(e => e !== tag));
                            }}
                        >
                            <span className="sr-only">Remove</span>
                            <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-gray-700/50 group-hover:stroke-gray-700/75">
                            <path d="M4 4l6 6m0-6l-6 6" />
                            </svg>
                            <span className="absolute -inset-1" />
                        </button>
                        </span>
                    ))}
                    <div className='mt-2'>
                        <label htmlFor="tag" className="block text-sm font-medium leading-6 text-gray-900">
                        Add Tag
                        </label>
                        <div className="mt-2 flex rounded-md shadow-sm">
                        <div className="relative flex flex-grow items-stretch focus-within:z-10">
                            <input
                            type="text"
                            name="tag"
                            id="add_tag"
                            className="block w-full rounded-none rounded-l-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-indigo-500"
                            onChange={(e) => {
                                setTagInput(e.target.value);
                            }}
                            value={tagInput}
                            />
                        </div>
                        <button
                            type="button"
                            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-indigo-300 dark:focus:ring-offset-indigo-900 dark:focus:ring-indigo-700 cursor-pointer disabled:cursor-not-allowed disabled:bg-indigo-300"
                            disabled={!isAddTagButtonEnabled(
                            tagInput,
                            newTags
                            )}
                            onClick={() => {
                            setNewTags([...newTags, tagInput]);
                            editDocument('tags', [...newTags, tagInput]);
                            setTagInput("");
                            }}
                        >
                            Add
                        </button>
                        </div>
                    </div> */}
                </Accordion>
                {/* {customFields &&
                Object.entries(customFields).map(([name, field]) => {
                    const Field = FieldDataMap[field.fieldType]
                    if (isArrayCustomField(field)) {
                    Field.props.suggestions = field.values
                    }
                    return (
                    <Accordion
                        key={name}
                        title={`${field.title}${field.required ? '*' : ''}`}
                        error={!!errors[name]?.message}
                    >
                        <Field.component
                        id={name}
                        label={field.description}
                        {...Field.props}
                        />
                    </Accordion>
                    )
                })} */}
            </div>
          </aside>
    );
}