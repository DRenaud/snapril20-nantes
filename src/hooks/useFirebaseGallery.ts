import { useState, useEffect } from 'react';
import { useCamera } from '@ionic/react-hooks/camera';
import { useFilesystem, base64FromPath } from '@ionic/react-hooks/filesystem';
import { isPlatform } from '@ionic/react';
import { CameraResultType, CameraSource, CameraPhoto } from '@capacitor/core';
import firebase from 'firebase';
const PHOTO_STORAGE = 'messages';

export function useFirebaseGallery() {
    const messagesRef = firebase.database().ref(PHOTO_STORAGE);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const { getPhoto } = useCamera();
    const { readFile } = useFilesystem();

    useEffect(() => {
        const bob = () => {
            messagesRef.on('value', (snaps) => {
                if (snaps.hasChildren()) {
                    const newPhoto: Photo[] = [];

                    snaps.forEach((snap) => {
                        if (snap.exists()) {
                            newPhoto.push(snap.val());
                        }
                    });

                    setPhotos(newPhoto);
                }
            });
        };
        bob();
    }, []);

    const takePhoto = async () => {
        const cameraPhoto = await getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100,
        });
        const fileName = new Date().getTime() + '.jpeg';
        savePicture(cameraPhoto, fileName);
    };

    const savePicture = async (photo: CameraPhoto, fileName: string) => {
        let base64Data: string;
        // "hybrid" will detect Cordova or Capacitor;
        if (isPlatform('hybrid')) {
            const file = await readFile({
                path: photo.path!,
            });
            base64Data = 'data:image/png;base64,' + file.data;
        } else {
            base64Data = await base64FromPath(photo.webPath!);
        }

        // Use webPath to display the new image instead of base64 since it's
        // already loaded into memory

        messagesRef.push({ filepath: fileName, webviewPath: base64Data });
    };

    return {
        photos,
        takePhoto,
    };
}

export interface Photo {
    filepath: string;
    webviewPath?: string;
}
