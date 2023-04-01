import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { blogGetByIdAction, extraPutAction } from "../actions/blogsAction";
import { Message } from "../components/Message";
import { EXTRA_PUT_RESET } from "../constants/BlogsConstants";
const EditExtraofBlog = ({
  subHeading,
  description,
  image,
  id,
  blogId,
  imageName,
}) => {
  const [esubHeading, setESubHeading] = useState(subHeading);
  const [edescription, setEdscription] = useState(description);
  const [img, setImg] = useState("");
  const [eImage, setEImage] = useState(image);
  const [updateSubheadingImg, setUpdateSubheadingImg] = useState(imageName);
  const [message, setMessage] = useState("");
  const { onClose, onOpen, isOpen } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();
  const Imagehandler = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);

    setEImage(url);
    setImg(file);
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const extraUpdated = useSelector((state) => state.extraUpdatedByID);
  const { success } = extraUpdated;

  const uploadHandler = async (e) => {
    if (esubHeading === "" || edescription === "") {
      setMessage("PLEASE FILL ALL THE FIELDS");
    } else {
      e.preventDefault();
      const formData = new FormData();
      formData.append("subHeading", esubHeading);
      formData.append("content", edescription);
      img
        ? formData.append("file", img)
        : formData.append("image", updateSubheadingImg);
      formData.append("upload_preset", "geekyImages");
      dispatch(extraPutAction(formData, id));

      onClose();
      toast({
        title: "Subheading Updated",
        description: "Your subheading has been updated",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <IconButton onClick={onOpen} size="sm" icon={<EditIcon />} />
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Subheading {id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {message && <Message status="error">{message}</Message>}
            <FormControl>
              <FormControl>
                <FormLabel>Sub Heading</FormLabel>
                <Input
                  value={esubHeading}
                  name="esubHeading"
                  placeholder="Enter your content"
                  required
                  onChange={(e) => setESubHeading(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={edescription}
                  name="edescription"
                  placeholder="Enter your Description"
                  required
                  onChange={(e) => setEdscription(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>SubHeading Image</FormLabel>
                <input
                  value={updateSubheadingImg}
                  onChange={(e) => setUpdateSubheadingImg(e.target.value)}
                  type="text"
                  name="image"
                />

                <div className="file-upload">
                  <Input
                    // key={key}
                    type="file"
                    onChange={(e) => Imagehandler(e)}
                    // name="image"
                    readOnly
                  />
                  <Image src={eImage} />
                </div>
              </FormControl>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={uploadHandler}>
              Update Subheading
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditExtraofBlog;
