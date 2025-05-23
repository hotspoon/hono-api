import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import * as controller from "@/features/playlists/playlists.controller";
import {
  addTrackSchema,
  playlistSchema,
} from "@/features/playlists/playlists.schema";

const playlists = new Hono();

playlists.get("/", controller.listPlaylists);
playlists.get("/:id", controller.getPlaylist);
playlists.post(
  "/",
  zValidator("json", playlistSchema),
  controller.createPlaylist,
);
playlists.put(
  "/:id",
  zValidator("json", playlistSchema),
  controller.updatePlaylist,
);
playlists.delete("/:id", controller.deletePlaylist);

playlists.get("/:id/tracks", controller.listPlaylistTracks);
playlists.post(
  "/:id/tracks",
  zValidator("json", addTrackSchema),
  controller.addTrackToPlaylist,
);
playlists.delete("/:id/tracks/:trackId", controller.removeTrackFromPlaylist);

export default playlists;
