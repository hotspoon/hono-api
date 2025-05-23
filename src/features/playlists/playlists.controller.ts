import type { Context } from "hono";
import * as service from "@/features/playlists/playlists.service";

export const listPlaylists = (c: Context) => {
  const playlists = service.getPlaylists();
  return c.json(playlists);
};

export const getPlaylist = (c: Context) => {
  const id = c.req.param("id");
  const playlist = service.getPlaylistById(id);
  if (!playlist) {
    return c.json({ error: "Playlist not found", status: 404 }, 404);
  }
  return c.json(playlist);
};

export const createPlaylist = (c: Context) => {
  const playlist = c.req.valid("json" as never);
  const result = service.createPlaylist(playlist);
  return c.json(
    {
      message: "Playlist created successfully",
      id: result.lastInsertRowid,
    },
    201,
  );
};

export const updatePlaylist = (c: Context) => {
  const id = c.req.param("id");
  const playlist = c.req.valid("json" as never);
  const result = service.updatePlaylist(id, playlist);
  if (result.changes === 0) {
    return c.json({ error: "Playlist not found", status: 404 }, 404);
  }
  return c.json({
    message: "Playlist updated successfully",
    id: id,
  });
};

export const deletePlaylist = (c: Context) => {
  const id = c.req.param("id");
  const result = service.deletePlaylist(id);
  if (result.changes === 0) {
    return c.json({ error: "Playlist not found", status: 404 }, 404);
  }
  return c.json({
    message: "Playlist deleted successfully",
    id: id,
  });
};

export const listPlaylistTracks = (c: Context) => {
  const id = c.req.param("id");
  const tracks = service.getPlaylistTracks(id);
  return c.json(tracks);
};

export const addTrackToPlaylist = (c: Context) => {
  const id = c.req.param("id");
  const { trackId } = c.req.valid("json" as never);
  const result = service.addTrackToPlaylist(id, trackId);
  return c.json(
    {
      message: "Track added to playlist",
      playlistId: id,
      trackId: trackId,
    },
    201,
  );
};

export const removeTrackFromPlaylist = (c: Context) => {
  const playlistId = c.req.param("id");
  const trackId = c.req.param("trackId");
  const result = service.removeTrackFromPlaylist(playlistId, trackId);
  if (result.changes === 0) {
    return c.json({ error: "Track not found in playlist", status: 404 }, 404);
  }
  return c.json({
    message: "Track removed from playlist",
    playlistId,
    trackId,
  });
};
