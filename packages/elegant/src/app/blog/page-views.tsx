export default function PageViews({ 
    slug,
    views
}: { 
    slug: string, 
    views: {
        slug: string;
        count: number;
    }[];
}) {
    const viewsForSlug = views && views.find((view) => view.slug === slug);
    const number = new Number(viewsForSlug?.count || 1);

    return (
        <p className="text-xs py-2">
          {`${number.toLocaleString()} ${number != 1 ? 'views' : 'view'}`}
        </p>
      );
}