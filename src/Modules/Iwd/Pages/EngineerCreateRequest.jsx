import React, { useState } from "react";
import {
    Button,
    Container,
    Flex,
    Grid,
    Loader,
    Tabs,
    Paper,
    Text,
    Textarea,
    Select,
    Center,
    CheckIcon,
    TextInput,
    NumberInput
} from "@mantine/core";
import { DateInput } from '@mantine/dates';
import classes from './EngineerIssueWorkOrder.module.css';

function EngineerCreateRequest(
    { setSelectedComplaint }
) {
    // const handleSubmitButtonClick = () => {
    //     setSelectedComplaint(null);
    // };

    const handleBackButtonClick = () => {
        setSelectedComplaint(null);
    }

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmitButtonClick = () => {
        setIsLoading(true);
        setIsSuccess(false);

        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);

            setTimeout(() => {
                setSelectedComplaint(null);
            }, 1000);
        }, 1000);
    };

    const [value, setValue] = useState(null);

    return <Grid mt="xl">
        <div className="container">
            <nav className="breadcrumb">
                Home &gt; Other &gt; IWD &gt; Create Request
            </nav>

            <div className="tabs">
                <div className="buttons-container">
                    <span className="arrow left-arrow">&#9664;</span>
                    <button className="bold-button">Generate Bills</button>
                    <button>Create Request</button>
                    <button>Request Status</button>
                    <button>Rejected Request</button>
                    <button>Issue Work Order</button>
                    <span className="arrow right-arrow">&#9654;</span>
                </div>
            </div>

            <Paper
                radius="md"
                px="lg"
                pt="sm"
                pb="xl"
                style={{ borderLeft: "0.6rem solid #15ABFF", width: "30vw", minHeight: "45vh", maxHeight: "70vh" }}
                withBorder
                maw="1240px"
                backgroundColor="white"
            >
                <Flex
                    direction="column"
                    gap="lg"
                    style={{ textAlign: "left", width: "100%", fontFamily: 'Arial' }}
                >
                    <Flex direction="column">
                        <Text size="22px" style={{ fontWeight: 'bold' }}>
                            New Request
                        </Text>
                    </Flex>

                    <Flex direction="column" gap="xs" justify="flex-start">
                        <TextInput label="Name" placeholder="" classNames={classes} />
                    </Flex>

                    <Flex direction="column" gap="xs">
                        <Textarea
                            placeholder="Description"
                            required
                            variant="filled"
                            style={{ width: "100%" }}
                            backgroundColor="#efefef"
                            cols={50}
                            rows={3}
                        />
                    </Flex>

                    <Flex direction="column" gap="xs" justify="flex-start">
                        <TextInput label="Area" placeholder="" classNames={classes} />
                    </Flex>

                    <Flex direction="column" gap="xs" justify="flex-start">
                        <Select
                            mt="md"
                            comboboxProps={{ withinPortal: true }}
                            data={['Director', 'Dean']}
                            placeholder="Director(Dir)"
                            label="Send To"
                            classNames={classes}
                        />
                    </Flex>

                    <Flex gap="xs">
                        <Button
                            size="sm"
                            variant="filled"
                            color="black"
                            style={{
                                width: '100px',
                                backgroundColor: "#1E90FF",
                                color: isSuccess ? "black" : "white",
                                border: "none",
                                borderRadius: "20px"

                            }}
                            onClick={handleSubmitButtonClick}
                            disabled={isLoading || isSuccess}
                        >
                            {isLoading ? (
                                <Center>
                                    <Loader color="black" size="xs" />
                                </Center>
                            ) : isSuccess ? (
                                <Center>
                                    <CheckIcon size="16px" color="black" />
                                </Center>
                            ) : (
                                'Submit'
                            )}
                        </Button>
                        <Button
                            size="sm"
                            variant="filled"
                            color="#1E90FF"
                            onClick={handleBackButtonClick}
                            disabled={isLoading || isSuccess}
                            style={{
                                border: "none",
                                borderRadius: "20px"

                            }}
                        >
                            Back
                        </Button>
                    </Flex>
                </Flex>
            </Paper>
        </div>
    </Grid>;
}

export default EngineerCreateRequest;