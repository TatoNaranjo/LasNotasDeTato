---
title: PLC Programming Ladder Logic - GeeksforGeeks
source: https://www.geeksforgeeks.org/plc-programming-ladder-logic/
author:
  - "[[GeeksforGeeks]]"
published: 2023-11-06
created: 2025-02-07
description: A Computer Science portal for geeks. It contains well written, well thought and well explained computer science and programming articles, quizzes and practice/competitive programming/company interview Questions.
tags:
  - OctavoSemestre
date: 2025-02-07
---
A PLC or Programmable Logic Controller is a special type of digital computer without a monitor and keyboard. This is basically used in industrial automation such as manufacturing, automotive, food and beverage, chemical processing, and more to automate systems. This tiny computer receives data through input and sends operating instructions as output.

As the name suggests, it's a programable device. The main languages that are used to program a PLC are 'Ladder Logic' and 'C'. Ladder Logic is the most used programming for PLCs.

Table of Content

- [Ladder Logic](https://www.geeksforgeeks.org/plc-programming-ladder-logic/#ladder-logic)
- [Ladder Logic Structure](https://www.geeksforgeeks.org/plc-programming-ladder-logic/#ladder-logic-structure)
- [Ladder Logic Components](https://www.geeksforgeeks.org/plc-programming-ladder-logic/#ladder-logic-components)
- [Description and Working](https://www.geeksforgeeks.org/plc-programming-ladder-logic/#description-and-working-of-ladder-logic)
- [Advantages an Disadvantages](https://www.geeksforgeeks.org/plc-programming-ladder-logic/#advantages-an-disadvantages-of-ladder-logic)
- [Applications](https://www.geeksforgeeks.org/plc-programming-ladder-logic/#applications-of-ladder-logic)
- [Examples](https://www.geeksforgeeks.org/plc-programming-ladder-logic/#examples-of-some-ladder-logic-programming)

## ****Ladder Logic****

Ladder logic is basically a program that is represented by a graphical diagram, which is based on a circuit diagram of relay logic. This program contains two vertical lines called 'rails' and horizontal lines called 'rungs' which makes it look like a perfect ladder. The graphical representation of an ladder logic program is called as Ladder Logic diagram(LLD).

## Ladder Logic Structure

![Ladder-Logic-Structure](https://media.geeksforgeeks.org/wp-content/uploads/20231026103745/Ladder-Logic-Structure-660.png)

Ladder Logic Diagram

  
Ladder logic diagram are graphical programming language which executes through real time input. It has two vertical line, which is called as rails, the left rail supplies power to the circuit, then it passes through each rung. Each rung has switches and output coil. Switches can perform OR, AND and NOT operation, and through these basic logic operation we can make any programming logic in PLC. A ladder logic diagram executes from left to right and top to bottom. When all the condition of a rung met the connected output coil get energized. then it activate the real world system, such as turning on a motor or turning off a motor. This process is continuously scanned and repeated by the PLC and control system to ensure the automation of operating system.

## ****Ladder Logic Components****

There are some Ladder logic components given below :

### ****Rail and Rung****

Vertical lines are called rails and the horizontal lines are called rungs.

### ****Concept of NO/NC switch****

NO(Normally Open) and NC(Normally Closed) are used to represent the state of current flow or contact in electronics circuit, which is also used is PLC ladder logic programming. These terms define whether the switch is open or closed.

### Normally Open

- A normally open switch or contact is open when not actuated.
- It closes the circuit when pressed or activated, allowing current flow.
- In ladder logic diagrams, a normally open contact is shown as an open gap and becomes a solid line when activated.

### Normally Closed

- Normally closed switch/contact is closed when not actuated.
- Activation of the switch opens the circuit, stopping current flow.
- In ladder logic diagrams, it's represented as a solid line, becoming an open gap when activated.

![NONC-switch-and-output](https://media.geeksforgeeks.org/wp-content/uploads/20231026103938/NONC-switch-and-output-660.png)

Switch and Their Output

### Output/Coil

Output devices are such as motor, valve, indicator, lights etc. but in LLD it is represented by vertical line with a label representing the output device.

## Description and Working of Ladder Logic

- Firstly two rails are taken, and then a rungs. The rails will work here as a supply of source or current supply.
- The left rail is connected to the input switch and the right rail in connected to the output coil. and the switch and coils are connected through a wire.
- Then add input switch, it can be NO or NC depending on the logic to be created. Switches should be placed at the left side rail. The number of switch and placement of it can vary depending on the logic is creating.
- For creating this logic, we create truth table, and according to that, put the switch, if input is '0' , generally NO switch is used, but NC switch can also be used, but in that case we have to make it opened, or false. For '1' input, NC switches are used, but same like previous NO switch can also be used.
- An output coil should be connected to the right side rails.

```
File extension for Ladder Logic Diagram :   .LLG
```

## Advantages an Disadvantages of Ladder Logic

Some advantages and disadvantages of Ladder Logic are :

### Advantages

- A graphical diagram of electrical relay diagram, which makes it easy to understand.
- The visual representation of rungs reduces maintenance.
- LLD allow real time monitoring of the system status, which makes it more reliable.
- LLDs are modular and can be easily modified or expanded to accommodate changes in the control process.
- LLD is widely accepted as so many engineers and technicians are already familiar to this.

### Disadvantages

- LLD can face problem in complex control system as the lack in sophistication of high level programming language.
- it is not suitable for time based operation or sequential problem.
- Proper documentation and version control can be challenging.
- It is not suitable for data processing task.

## Applications of Ladder Logic

Ladder logic programming used in various industries such as

- LLDs are widely used in manufacturing control to control different machinery to sort item, quality control, packaging etc.
- LLD can control pressure, chemical balance in Water treatment.
- It controls HVAC (Heating, Ventilation, and Air Conditioning) in buildings to ensure temperature, ventilation and energy efficiency.
- LLDs often used in traffic control to maintain the time and sequence of traffic light.
- To control Elevator LLD can be used for floor selection, door opening and closing etc.
- Ladder logic is also used in food packaging and beverage processing.
- LLDs control various aspects of chemical manufacturing, including temperature, pressure, mixing, and safety systems
- LLD play some crucial role to store renewable energy in system.

## Examples of Some Ladder Logic Programming

Some examples of Ladder Logic Programming are :

### Creating AND gate Ladder logic diagram

> AND logic : Y=A.B (here A and B are the inputs, and Y is output)

### ****Truth Table****

| Input (A) | Input (B) | Output (Y = A.B) |
| --- | --- | --- |
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

![AND-gate-ladder-logic-diagram](https://media.geeksforgeeks.org/wp-content/uploads/20231026104349/AND-gate-ladder-logic-diagram-660.png)

AND Gate Ladder Logic Diagram

Here, NO switches are representing input 0, means no current is passing, and NC switch are representing input 1, which means current passing through the circuit. Each line in the diagram representing each combination from truth table. First line, where A=B=0, means no current is passing. As they are in series line(according to AND logic) no current will reach to the output module. Same for the other rungs, created from the truth table, to show each switch in series, and check if it's matching the table or not.

### Creating OR gate Ladder logic diagram

> OR Gate logic : Y = (A+B)

### ****Truth Table****

| Input (A) | Input (B) | Output (Y = A+B) |
| --------- | --------- | ---------------- |
| 0         | 0         | 0                |
| 0         | 1         | 1                |
| 1         | 0         | 1                |
| 1         | 1         | 1                |

### ![OR-gate-ladder-logic-diagram](https://media.geeksforgeeks.org/wp-content/uploads/20231026104507/OR-gate-ladder-logic-diagram-660.png)

OR Gate Ladder Logic Diagram

In a circuit OR gate represents parallel circuit, that's why we have here places two switches in parallel. Others are same as discussed in previous example, NC switches(green) means current passing, which is denoted by 1, and NC switch(white) means no current passing, denoted by 0. Then check the output from the truth table.

Similarly we can create [NAND gate](https://www.geeksforgeeks.org/implementing-any-circuit-using-nand-gate-only/), NOR gate, XOR gate etc. other [logic gates](https://www.geeksforgeeks.org/logic-gates/) using ladder logic diagram.

## Conclusion

Ladder logic programming is widely used graphical language in industrial automation control. It simplify control system design and troubleshooting. It is a graphical representation of electrical relay where we can perform various logical operation. It is used in various industries such as manufacturing automation, water treatment, chemical reaction, PH control etc. But it is less ideal for complex system. Never the less, LLD play a crucial role in automation control industry.

## FAQs on PLC Programming Ladder Logic

### 1\. How do you read a ladder logic diagram?

> Ladder logic diagrams are read from left to right, just like reading a book. Each rung represents a specific control operation, with input conditions on the left and output actions on the right.

### 2\. What is the purpose of the vertical power rails in ladder logic?

> The vertical power rails in a ladder logic diagram represent the electrical power supply. The left rail typically represents the positive voltage, while the right rail represents the ground or common connection.

### 3\. What is the difference between ladder logic and function block diagrams (FBD) in PLC programming?

> While both ladder logic and function block diagrams are used in PLC programming, ladder logic is more visual and resembles traditional electrical schematics, while FBD represents control logic using blocks and connections, often resembling flowcharts.

### 4\. What are timers and counters in ladder logic?

> Timers and counters are specialized components in ladder logic used to introduce time-based or count-based control logic. Timers can introduce delays or control actions for a specific time period, while counters keep track of events or counts.