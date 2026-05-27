import { Directory, File, Paths } from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Share } from "react-native";

async function ensureLocal(uri: string): Promise<string> {
  if (!uri.startsWith("http")) return uri;
  const file = await File.downloadFileAsync(uri, new Directory(Paths.cache));
  return file.uri;
}

export async function saveToLibrary(uri: string): Promise<boolean> {
  const perm = await MediaLibrary.requestPermissionsAsync();
  if (!perm.granted) return false;
  const localUri = await ensureLocal(uri);
  await MediaLibrary.saveToLibraryAsync(localUri);
  return true;
}

export async function shareImage(uri: string): Promise<void> {
  await Share.share({ url: uri, message: "Made with Image Magic ✨" });
}
