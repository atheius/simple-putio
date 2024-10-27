import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Modal from "react-modal";

// import "./styles.css";

Modal.setAppElement("#root");

function AddFolder({
  closeModal,
  modalIsOpen,
}: {
  closeModal: (folderName?: string) => void;
  modalIsOpen: boolean;
}) {
  const [folderName, setFolderName] = useState("");

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = folderName;
    setFolderName("");
    closeModal(name);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => closeModal()}
      style={{
        content: {
          top: "10%",
          left: "10%",
          right: "auto",
          bottom: "auto",
          marginRight: "-10%",
          transform: "translate(-6%, -10%)",
          width: "90%",
          padding: 0,
        },
        overlay: {
          zIndex: 999,
        },
      }}
      contentLabel="Add Folder"
    >
      <div className="">
        <div className="flex items-center">
          <h2 className="grow m-4 font-semibold text-2xl">Add folder</h2>
          <button
            className="mx-4 p-2 text-xs"
            aria-description="close"
            onClick={() => closeModal()}
          >
            <FontAwesomeIcon icon={["fas", "x"]} />
          </button>
        </div>
        <hr />
        <form onSubmit={onFormSubmit}>
          <div className="m-8">
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
                <FontAwesomeIcon icon={["far", "folder"]} />
              </span>
              <input
                type="text"
                id="folder-name"
                value={folderName}
                onInput={(e) =>
                  setFolderName((e.target as HTMLInputElement).value)
                }
                className="rounded-none rounded-e-lg bg-white border text-gray-900 focus:outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-300 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                placeholder="Folder name"
              />
            </div>
          </div>
          <hr />
          <div className="text-center">
            <button
              type="submit"
              className="my-3 bg-amber-300 hover:bg-amber-400 focus:outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-300 py-2 px-4 rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default AddFolder;
