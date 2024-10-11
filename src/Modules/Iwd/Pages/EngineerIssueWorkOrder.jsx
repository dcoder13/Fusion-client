// import { useState } from 'react';
// import { DateInput } from '@mantine/dates';
// import { Select, TextInput, NumberInput } from '@mantine/core';
// import classes from './EngineerIssueWorkOrder.module.css';

// function EngineerIssueWorkOrder() {
//     const [value, setValue] = useState(null);

//     return (
//         <div>
//             <h1 style={{ marginLeft: '16px' }}>New Order</h1>
//             <div className={classes.parentContainer}>
//                 <div className={classes.issueWorkOrderForm}>

//                     <div className={classes.containerDiv}>
//                         <TextInput label="Request ID" placeholder="" classNames={classes} />
//                         <TextInput label="Request" placeholder="" classNames={classes} />
//                     </div>


//                     <DateInput
//                         value={value}
//                         onChange={setValue}
//                         label="Date"
//                         placeholder="dd/mm/yyyy"
//                         classNames={classes}
//                     />

//                     <NumberInput
//                         label="Amount"
//                         description=""
//                         placeholder=""
//                         classNames={classes}
//                     />

//                     <Select
//                         mt="md"
//                         comboboxProps={{ withinPortal: true }}
//                         data={['React', 'Angular', 'Svelte', 'Vue']}
//                         placeholder="Pick one"
//                         label="Your favorite library/framework"
//                         classNames={classes}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default EngineerIssueWorkOrder;

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

function EngineerIssueWorkOrder(
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
        <Paper
            radius="md"
            px="lg"
            pt="sm"
            pb="xl"
            style={{ borderLeft: "0.6rem solid #15ABFF", width: "70vw", minHeight: "45vh", maxHeight: "70vh" }}
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
                        New Order
                    </Text>
                </Flex>

                <Grid columns="2" style={{ width: "100%" }}>
                    <Grid.Col span={1}>
                        <Flex direction="column" gap="xs">
                            <TextInput label="Request ID" placeholder="" classNames={classes} />
                        </Flex>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Flex direction="column" gap="xs">
                            <TextInput label="Request" placeholder="" classNames={classes} />
                        </Flex>
                    </Grid.Col>
                </Grid>

                <Grid columns="2" style={{ width: "100%" }}>
                    <Grid.Col span={1}>
                        <Flex direction="column" gap="xs">
                            <DateInput
                                value={value}
                                onChange={setValue}
                                label="Date"
                                placeholder="dd/mm/yyyy"
                                classNames={classes}
                            />
                        </Flex>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Flex direction="column" gap="xs">
                            <TextInput label="Agency" placeholder="" classNames={classes} />
                        </Flex>
                    </Grid.Col>
                </Grid>

                <Grid columns="2" style={{ width: "100%" }}>
                    <Grid.Col span={1}>
                        <Flex direction="column" gap="xs">
                            <NumberInput
                                label="Amount"
                                description=""
                                placeholder=""
                                classNames={classes}
                            />
                        </Flex>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Flex direction="column" gap="xs">
                            <NumberInput
                                label="Deposit"
                                description=""
                                placeholder=""
                                classNames={classes}
                            />
                        </Flex>
                    </Grid.Col>
                </Grid>

                <Flex direction="column" gap="xs" justify="flex-start">
                    <TextInput label="Alloted Time" placeholder="" classNames={classes} style={{ width: '50%' }} />
                </Flex>

                {/* <Flex direction="column" gap="xs">
                    <Text size="18px" style={{ fontWeight: 'bold' }}>
                        Please fill feedback*
                    </Text>
                    <Textarea
                        placeholder="Please fill feedback"
                        required
                        variant="filled"
                        style={{ width: "100%" }}
                        backgroundColor="gray"
                        cols={50}
                        rows={3}
                    />
                </Flex> */}

                <Grid columns="2" style={{ width: "100%" }}>
                    <Grid.Col span={1}>
                        <Flex direction="column" gap="xs">
                            <DateInput
                                value={value}
                                onChange={setValue}
                                label="Start Date"
                                placeholder="dd/mm/yyyy"
                                classNames={classes}
                            />
                        </Flex>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Flex direction="column" gap="xs">
                            <DateInput
                                value={value}
                                onChange={setValue}
                                label="End Date"
                                placeholder="dd/mm/yyyy"
                                classNames={classes}
                            />
                        </Flex>
                    </Grid.Col>
                </Grid>

                <Flex direction="row-reverse" gap="xs">
                    <Button
                        size="sm"
                        variant="filled"
                        color="black"
                        style={{
                            width: '100px',
                            backgroundColor: isSuccess ? "#2BB673" : undefined,
                            color: isSuccess ? "black" : "white"
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
                        color="black"
                        onClick={handleBackButtonClick}
                        disabled={isLoading || isSuccess}
                    >
                        Back
                    </Button>
                </Flex>
            </Flex>
        </Paper>
    </Grid>;
}

export default EngineerIssueWorkOrder;