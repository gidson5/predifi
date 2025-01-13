export function addressSlice(address: string ) {
  const userAddressStart = address.slice(0,6)
  const userAddressEnd = address.slice(-5);

  return `${userAddressStart}...${userAddressEnd}`
}



//import app from "@/firebase/config";
//import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
//const imageRef = useRef<HTMLInputElement>(null);
//  async function onSubmit(e: React.FormEvent) {
//    e.preventDefault();
//    const data = imageRef.current?.files;
//    // if image is empty
//    if (!data) {
//      console.log("no image"); // no image
//      return;
//    }
//    const storage = getStorage(app);

//    // Create the file metadata
//    const metadata = {
//      contentType: "image/jpeg",
//    };
//    const date = new Date().getMilliseconds();
//    // Upload file and metadata to the object 'images/mountains.jpg'
//    const storageRef = ref(storage, `poolImage/${data[0]?.name}-${date}`);

//    // upload image to firebase storage
//    if (data.length > 0) {
//      const snapshot = await uploadBytesResumable(storageRef, data[0], metadata);
//      console.log("Uploaded a blob or file!", snapshot);
//      const imgUrl = await getDownloadURL(snapshot.ref);
//      console.log("imgUrl", imgUrl);
//      console.log("snapshot", snapshot);
//    }

//    console.log("submit");
//  }