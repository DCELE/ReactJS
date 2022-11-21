import React, { useState } from 'react'
import { useToast, HStack, Input, Button } from '@chakra-ui/react'
import { nanoid } from 'nanoid';

function Todo({ addTodo }) {
    const toast = useToast()
    const [content, setContent] = useState("")

    function handleSubmit(e) {
        e.preventDefault();

        const todoText = content.trim();
        if (content === '') {
            toast({
                title: "Please enter todo.",
                position: "top",
                status: "warning",
                duration: 2000,
                isClosable: true,
            })
            return setContent("");
        }
        const todo = {
            id: nanoid(),
            body: todoText,
            text: content
        }

        addTodo(todo)
        setContent('')

    }
    return (
        <form onSubmit={handleSubmit}>
            <HStack mt='4' mb='4'>
                <Input
                    h='46'
                    size='lg'
                    value={content}
                    variant="outline"
                    placeholder="Enter new todo..."
                    onChange={(e) => setContent(e.target.value)} />
                <Button
                    colorScheme="green"
                    h='46'
                    type="submit">
                    Add
                </Button>
            </HStack>
        </form>

    )
}

export default Todo