import { Box, Center, Container, Image, Stack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { blogGetByIdAction } from '../actions/blogsAction';

const SingleBlogScreen = () => {
  const dispatch = useDispatch();
  const match = useParams();
  const blogId = match.id;
  const fetchBlogById = useSelector((state) => state.userBlogFetchById);
  const { blog } = fetchBlogById;

  useEffect(() => {
    dispatch(blogGetByIdAction(blogId));
  }, [blogId, dispatch]);

  return (
    <>
      <Stack py={50} align="center">
        <Center>
          <Text fontWeight="bold" textColor="#aeacac">
            {dayjs(blog?.createdAt).format('MMM DD, YYYY')}
          </Text>
        </Center>
        <Center>
          <Text textAlign="center" fontSize="30" style={{ fontWeight: 'bold' }}>
            {blog?.title}
          </Text>
        </Center>
        <Box position="relative">
          <Image className="imgg" src={blog?.image} />
          <Container fontSize="17" maxW={700} py={50}>
            <Text>{blog?.description}</Text>
          </Container>
          {blog?.extra?.map((ex) => (
            <Container maxW={700} py={5}>
              <Text fontWeight="bold">{ex.subHeading}</Text>
              <Text>{ex.content}</Text>
              <Image py={5} src={ex.image} />
            </Container>
          ))}
        </Box>
      </Stack>
    </>
  );
};

export default SingleBlogScreen;
