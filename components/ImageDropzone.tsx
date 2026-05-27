import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Pressable, View } from "react-native";

import { Text } from "@/components/ui";
import { useTheme } from "@/hooks/useTheme";

export type ImageDropzoneProps = {
  uri: string | null;
  onPick: (uri: string) => void;
};

export function ImageDropzone({ uri, onPick }: ImageDropzoneProps) {
  const { colors } = useTheme();

  const pick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      allowsEditing: true,
    });
    if (!result.canceled && result.assets[0]) {
      onPick(result.assets[0].uri);
    }
  };

  return (
    <Pressable onPress={pick} className="w-full aspect-[3/4] rounded-2xl overflow-hidden">
      {uri ? (
        <View className="flex-1">
          <Image
            source={uri}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
          />
          <View className="absolute bottom-3 right-3 flex-row items-center gap-1 px-3 py-2 rounded-full bg-black/55">
            <Ionicons name="image-outline" size={16} color="#FFFFFF" />
            <Text variant="label" className="text-white">
              Change photo
            </Text>
          </View>
        </View>
      ) : (
        <View className="flex-1 items-center justify-center gap-2 bg-surface border-2 border-dashed border-border rounded-2xl">
          <Ionicons name="add-circle-outline" size={40} color={colors.primary} />
          <Text variant="heading">Tap to add a photo</Text>
          <Text variant="caption">Choose from your library</Text>
        </View>
      )}
    </Pressable>
  );
}
