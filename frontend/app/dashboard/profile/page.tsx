"use client";
import app from "@/firebase/config";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRef } from "react";
function Profile() {
  const imageRef = useRef<HTMLInputElement>(null);
  async function onSubmit(e:React.FormEvent) {
    e.preventDefault();
             const data = imageRef.current?.files;
            // if image is empty
            if (!data) {
              console.log("no image"); // no image
              return;
            }
            const storage = getStorage(app);

            // Create the file metadata
            const metadata = {
              contentType: "image/jpeg",
            };
            const date = new Date().getMilliseconds();
            // Upload file and metadata to the object 'images/mountains.jpg'
            const storageRef = ref(storage, `poolImage/${data[0]?.name}-${date}`);

            // upload image to firebase storage
            if (data.length > 0) {
              const snapshot =await uploadBytesResumable(
                storageRef,
                data[0],
                metadata);
              console.log("Uploaded a blob or file!", snapshot);  
              const imgUrl = await getDownloadURL(snapshot.ref);
              console.log("imgUrl", imgUrl);
              console.log("snapshot", snapshot);
            }
           
          
    console.log("submit");
  }
  return (
    <section>
      <form action="" onSubmit={(e) => onSubmit(e)}>
        <div>
          <label htmlFor="">image</label>
          <input ref={imageRef} type="file" name="" id="" className="border " />
        </div>
        <div>
          <label htmlFor=""></label>
          <input type="text" name="" id="" className="border " />
        </div>
        <div>
          <label htmlFor="">pool type</label>
          <input type="text" name="" id="" className="border " />
        </div>
        <div>
          <label htmlFor="">name</label>
          <input type="text" name="" id="" className="border " />
        </div>
        <div>
          <label htmlFor="">event url</label>
          <input type="text" name="" id="" className="border " />
        </div>
        <div>
          <label htmlFor="">start-time</label>
          <input type="date" name="" id="" className="border " />
        </div>
        <div>
          <label htmlFor="">lock-time</label>
          <input type="date" name="" id="" className="border " />
        </div>
        <div>
          <label htmlFor="">end-time</label>
          <input type="date" name="" id="" className="border " />
        </div>
        <div>
          <label htmlFor="">pool-option</label>
          <input type="text" name="" id="" className="border " />
        </div>
        <div>
          <label htmlFor="">pool-option</label>
          <input type="text" name="" id="" className="border " />
        </div>
        <div>
          <label htmlFor="">min-bet-amount</label>
          <input type="text" name="" id="" className="border " />
        </div>
        <div>
          <label htmlFor="">max-bet-amount</label>
          <input type="text" name="" id="" className="border " />
        </div>
        <div>
          <label htmlFor="">creator-fee</label>
          <input type="text" name="" id="" className="border " />
        </div>
        <button type="submit" className="border p-2">
          submit
        </button>
      </form>
    </section>
  );
}
export default Profile;
