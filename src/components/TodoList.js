import React, { useState } from 'react'
import {
    Box, Text, VStack, StackDivider, Flex,
    Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
    Input, Button, SimpleGrid, GridItem
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'

function TodoList({ todos, deleteTodo, editTodo }) {

    const [modalContent, setModalContent] = useState({})
    const [isOpen, setIsOpen] = useState(false)

    function onClose() {
        setIsOpen(false)
    }

    function handleEditClick(todo) {
        setIsOpen(true)
        setModalContent(todo)
    }

    function handleEditInputChange(e, id) {
        setModalContent({ ...modalContent, text: e.target.value });
    }

    function handleEditSubmit(e) {
        e.preventDefault();

        editTodo(modalContent.id, modalContent)

        setModalContent("")
        setIsOpen(false)
    }

    return (

        !todos.length ?
            <Box
                variant="outline"
                border="1px"
                borderRadius="3"
                borderColor="gray.100"
                align="center"
            >
                <Text mt="5" mb="5" ml="4em" mr="4em">
                    You dont have any todos today</Text>
            </Box>
            : (
                <VStack
                    divider={<StackDivider />}
                    borderColor='gray.100'
                    borderWidth='2px'
                    maxW={350}
                    p='5'
                    borderRadius='lg'
                    alignItems='stretch'>
                    {todos.map((todo) => (

                        <SimpleGrid columns={5} columnGap={3} rowGap={6} w="full" mt={2} mb={2}>
                            <GridItem colSpan={4}><Text>{todo.text}</Text></GridItem>

                            <GridItem colSpan={1} mr="12" >
                                <Flex w="10%" >
                                    <DeleteIcon mr="5" cursor='pointer' onClick={() => deleteTodo(todo.id)} />
                                    <EditIcon cursor='pointer' onClick={() => handleEditClick(todo)} />
                                </Flex>
                            </GridItem>


                            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Edit todo</ModalHeader>
                                    <ModalCloseButton />
                                    <form onSubmit={handleEditSubmit}>
                                        <ModalBody>
                                            <Input
                                                value={modalContent.text}
                                                key={modalContent.id}
                                                variant="outline"
                                                type="text"
                                                placeholder="Update todo..."
                                                onChange={handleEditInputChange} />
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button colorScheme="red" mr={3} onClick={onClose}>
                                                Cancel
                                            </Button>
                                            <Button type="submit" colorScheme="green" mr={3}>
                                                Save
                                            </Button>
                                        </ModalFooter>
                                    </form>
                                </ModalContent>
                            </Modal>
                        </SimpleGrid>
                    ))}
                </VStack>
            )
    )
}


export default TodoList