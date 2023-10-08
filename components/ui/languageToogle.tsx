import * as React from "react";
import { usePathname, useParams, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Svgs } from "@/lib/svg";

export function SelectLanguage() {
  const { lang } = useParams() as { lang: string };
  const path = usePathname();
  const router = useRouter();
  const onValueChange = (value: string) => {
    if (value !== lang) router.push(path.replace(lang, value));
  };
  return (
    <Select onValueChange={onValueChange} defaultValue={lang}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="fr">Francais</SelectItem>
          <SelectItem value="en">Anglais</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
