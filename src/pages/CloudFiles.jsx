import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, storage } from "../firebase";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject
} from "firebase/storage";

function CloudFiles() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const loadFiles = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first.");
        return;
      }

      const folderRef = ref(
        storage,
        `hobby-files/${user.uid}`
      );

      const result = await listAll(folderRef);

      const fileList = await Promise.all(
        result.items.map(async (item) => {
          const url = await getDownloadURL(item);

          return {
            name: item.name,
            url,
            ref: item
          };
        })
      );

      setFiles(fileList);

    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const uploadFile = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first.");
        return;
      }

      if (!file) {
        alert("Please select a file.");
        return;
      }

      const fileRef = ref(
        storage,
        `hobby-files/${user.uid}/${Date.now()}-${file.name}`
      );

      await uploadBytes(fileRef, file);

      alert("File uploaded successfully!");

      setFile(null);

      loadFiles();

    } catch (error) {
      alert(error.message);
    }
  };

  const deleteFile = async (fileRef) => {
    try {
      await deleteObject(fileRef);

      alert("File deleted successfully!");

      loadFiles();

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Cloud Files</h1>

      <h2>Upload Hobby Proof</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />
      <br />

      <button onClick={uploadFile}>
        Upload to Cloud
      </button>

      <hr />

      <h2>My Uploaded Files</h2>

      {files.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        files.map((item) => (
          <div key={item.name}>
            <p>{item.name}</p>

            <img
              src={item.url}
              alt={item.name}
              width="200"
            />

            <br />
            <br />

            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              View File
            </a>

            <br />
            <br />

            <button
              onClick={() => deleteFile(item.ref)}
            >
              Delete File
            </button>

            <hr />
          </div>
        ))
      )}

      <br />

      <button onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default CloudFiles;