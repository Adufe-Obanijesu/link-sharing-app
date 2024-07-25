"use client";

// icons
import { BiLink } from "react-icons/bi";
import { LuEqual } from "react-icons/lu";
import { RxCaretDown } from "react-icons/rx";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { PopupContext } from "../Wrapper";
import { LinkProps } from "@/types/components";
import { platform_icons, platforms } from "../Platforms";
import { Platform } from "@/types/utils";

const Link = ({ index, link, links, setLinks }: LinkProps) => {
  const [showPlatforms, setShowPlatforms] = useState(false);

  const preventBubble = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const contextState = useContext(PopupContext);

  useEffect(() => {
    setShowPlatforms(false);
  }, [contextState?.cancelPopup]);

  const platform = platforms.filter((each) => each === link.name)[0];

  const updateURL = (e: ChangeEvent<HTMLInputElement>) => {
    const newLinks = links.map((each) => {
      if (each.id === link.id) {
        return {
          ...each,
          url: e.target.value,
        };
      }
      return each;
    });

    setLinks(newLinks);
  };

  const updatePlatfrom = (platform: Platform) => {
    setShowPlatforms(false);
    const newLinks = links.map((each) => {
      if (each.id === link.id) {
        return {
          ...each,
          name: platform,
        };
      }
      return each;
    });

    setLinks(newLinks);
  };

  const remove = () => {
    const newLinks = links.filter((each) => each.id !== link.id);
    setLinks(newLinks);
  };

  return (
    <div className="bg-grey-20 rounded-lg p-4 space-y-4">
      <div className="justify-between flex text-grey">
        <div className="v-center gap-2">
          <LuEqual />
          <span className="font-semibold">Link #{index + 1}</span>
        </div>
        <button className="text-grey font-medium" onClick={remove}>
          Remove
        </button>
      </div>

      <div className="space-y-4">
        <div className="text-grey">
          <label htmlFor="platform" className="text-sm">
            Platform
          </label>

          <div className="relative">
            <div>
              <button
                type="button"
                className="group w-full bg-white gap-x-1.5 rounded-md v-center justify-between py-2 px-4 text-grey border border-grey-50 hover:border-primary hover:shadow-input"
                aria-expanded="true"
                onClick={(e) => {
                  setShowPlatforms(!showPlatforms);
                  preventBubble(e);
                }}
              >
                <span className="v-center gap-4">
                  <span className="text-xl">{platform_icons[link.name]}</span>
                  <span className="font-medium">{link.name}</span>
                </span>
                <RxCaretDown
                  className={`text-2xl group-hover:text-primary transition-item ${
                    showPlatforms && "rotate-180"
                  }`}
                />
              </button>
            </div>

            <div
              className={`${
                showPlatforms ? "opacity-1" : "hidden opacity-0"
              } transition-all duration-200 ease-in absolute w-full z-50 mt-2 origin-top-right rounded-md bg-white shadow-md`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="py-1 px-4" role="none">
                {platforms.map((each, index) => (
                  <div
                    key={each}
                    className={`group bg-white cursor-pointer py-3 ${
                      platform === each ? "text-primary" : "text-grey"
                    } ${
                      index !== platforms.length - 1 ? "border-b" : "border-0"
                    } border-grey-50`}
                    aria-expanded="true"
                    onClick={() => updatePlatfrom(each)}
                  >
                    <div className="v-center gap-4">
                      <span className="group-hover:text-primary transition-item">
                        <span className="text-xl">{platform_icons[each]}</span>
                      </span>
                      <span className="font-medium group-hover:text-primary transition-item">
                        {each}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <label
            htmlFor={link.id}
            className={`block text-sm mb-1 ${
              link.error ? "text-danger" : "text-dark"
            }`}
          >
            Link
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-grey">
              <BiLink />
            </div>
            <input
              type="text"
              id={link.id}
              className={`block w-full pl-10 pr-4 py-3 ${
                link.error ? "border-danger" : "border-grey-50"
              } border group rounded-md leading-5 bg-transparent placeholder-grey focus:outline-none focus:border-primary focus:shadow-input`}
              placeholder="e.g. https://platform.com/username"
              name="url"
              value={link.url}
              onChange={updateURL}
            />

            {link.error && (
              <label
                htmlFor="url"
                className="v-center absolute top-0 right-[.5px] h-full"
              >
                <span className="text-danger z-10 bg-white py-2 rounded-r-md px-3">
                  {link.error}
                </span>
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Link;
