import { useContext } from "react";
import Link from "./Link";
import { Context } from "../SiteWrapper";

export default function Links() {

    const context = useContext(Context);

    return (
        <div className="space-y-4">
            {
                context?.links && context?.links.map((each, index) => {
                    return <Link key={each.url} name={each.platform} url={each.url} index={index} />
                })
            }
        </div>
    )
}