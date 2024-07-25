import Link from "./Link";
import { LinksProps } from "@/types/components";

export default function Links({ links, setLinks }: LinksProps) {
  return (
    <div className="space-y-4">
      {links.map((each, index) => {
        return (
          <Link
            key={each.id}
            link={each}
            links={links}
            setLinks={setLinks}
            index={index}
          />
        );
      })}
    </div>
  );
}
