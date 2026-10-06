import { itemCustom } from "@item-customizations";
import { nativeItem } from "./native";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@item"

const music = [
  {
    title: "Midnight City Lights",
    artist: "Neon Dreams",
    album: "Electric Nights",
    duration: "3:45",
  },
  {
    title: "Coffee Shop Conversations",
    artist: "The Morning Brew",
    album: "Urban Stories",
    duration: "4:05",
  },
  {
    title: "Digital Rain",
    artist: "Cyber Symphony",
    album: "Binary Beats",
    duration: "3:30",
  },
]

export function ItemImage() {
  return (
    <div {...nativeItem("flex w-full max-w-md flex-col gap-6")}>
      <ItemGroup {...itemCustom("gap-4")}>
        {music.map((song) => (
          <Item href="#" key={song.title} variant="outline" role="listitem">
            <ItemMedia variant="image">
              <img
                src={`https://avatar.vercel.sh/${song.title}`}
                alt={song.title}
                width={32}
                height={32}
                {...nativeItem("object-cover grayscale")}
              />
            </ItemMedia>
            <ItemContent>
              <ItemTitle {...itemCustom("line-clamp-1")}>
                {song.title} -{" "}
                <span {...nativeItem("text-muted-foreground")}>{song.album}</span>
              </ItemTitle>
              <ItemDescription>{song.artist}</ItemDescription>
            </ItemContent>
            <ItemContent {...itemCustom("flex-none text-center")}>
              <ItemDescription>{song.duration}</ItemDescription>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </div>
  )
}
