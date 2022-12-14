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

    function handleEdit(todo) {
        setIsOpen(true)
        setModalContent(todo)
    }

    function handleEditChange(e, id) {
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
                align="center">

                <Text mt="5" mb="5" ml="4em" mr="4em">
                    You dont have any todos today</Text>
            </Box>
            : (<VStack
                divider={<StackDivider />}
                borderColor='gray.100'
                borderWidth='2px'
                borderRadius='lg'
                alignItems='stretch'
                maxW={350}
                p='5'>
                {todos.map((todo) => (

                    <SimpleGrid columns={5} columnGap={3} rowGap={6} w="full" ml={1} mt={2} mb={2}>
                        <GridItem colSpan={4}><Text>{todo.text}</Text></GridItem>
                        <GridItem colSpan={1} mr={2} >
                            <Flex w="10%" >
                                <DeleteIcon mr="5" cursor='pointer' onClick={() => deleteTodo(todo.id)} />
                                <EditIcon cursor='pointer' onClick={() => handleEdit(todo)} />
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
                                            type="text"
                                            variant="outline"
                                            placeholder="Update todo..."
                                            value={modalContent.text}
                                            key={modalContent.id}
                                            onChange={handleEditChange} />
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
            </VStack>)
    )
}


export default TodoList