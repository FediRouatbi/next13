"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {} from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Search, SearchIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTokenStore, useUserStore } from "@/store/userAuth";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/themeToogle";

type Categorie = {
  id: string;
  name: string;
};
export default function Navbar({ categories }: { categories: Categorie[] }) {
  const { user, clearUser } = useUserStore();
  const { clearToken } = useTokenStore();
  return (
    <div className="sticky top-0 z-50 bg-background flex items-center gap-10  shadow-md ">
      <form className="flex items-center px-2 py-1 ml-10 bg-secondary rounded-md group focus-within:outline outline-2  focus-within:bg-background active::bg-background ">
        <input className="bg-transparent w-fit h-fit focus-visible:outline-none" />
        <button>
          <SearchIcon
            size={30}
            className="p-1 transition-all   rounded-md opacity-75 bg-muted"
          />
        </button>
      </form>
      <NavigationMenu className="py-5 ">
        <NavigationMenuList className="gap-5 ">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent className="z-[100]">
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] z-[100]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex flex-col justify-end w-full h-full p-6 no-underline rounded-md outline-none select-none bg-gradient-to-b from-muted/50 to-muted focus:shadow-md"
                      href="/"
                    >
                      <div className="mt-4 mb-2 text-lg font-medium">
                        shadcn/ui
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Beautifully designed components built with Radix UI and
                        Tailwind CSS.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {categories.map((el) => (
            <NavigationMenuLink
              key={el.id}
              className={navigationMenuTriggerStyle()}
              asChild
            >
              <Link href={`/fr/${el.name}`}>{el.name}</Link>
            </NavigationMenuLink>
          ))}
          <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="ml-auto mr-24">
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className=" cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 right-5" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Team</DropdownMenuItem>

                <DropdownMenuItem>New Team</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>GitHub</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  clearUser();
                  clearToken();
                }}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <ModeToggle />
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
