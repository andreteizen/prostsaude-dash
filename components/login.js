import {
    Flex,
    Heading,
    Button,
    Stack,
    Box,
    Avatar,
  } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react"



export default function Login() {
    
    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="gray.200"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            >
            <Box minW={{ base: "90%", md: "468px" }}>
                <Stack
                    spacing={4}
                    p="1rem"
                    width="30vw"
                    height="30vh"
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor="whiteAlpha.900"
                    boxShadow="md"
                >
                    
                    <Avatar bg="teal.500" />
                    <Heading color="teal.400">Bem vindo</Heading>
                    <Button
                        borderRadius={0}
                        type="submit"
                        variant="solid"
                        colorScheme="teal"
                        width="50%"
                        onClick={() => signIn('auth0')}
                    >
                    Login
                    </Button>
                </Stack>
            </Box>
            </Stack>
        </Flex>
    )
}
