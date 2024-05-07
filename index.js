const fs = require("fs");
const { stringify } = require("querystring");
const taskData = "./data.txt";

/****************************************************************************************
 * Generates an array of tasks from the taskData.
 * 
 * @param {string} taskData - The path to the file containing task data.
 * @returns {string[]} An array of tasks.
 ****************************************************************************************/
const taskArray = (taskData) => {
    const data = readTask(taskData);
    const result = JSON.stringify(data);
    const mark = result.slice(1, result.length - 1);
    const resultArray = mark.split("\\n");
    const filterResult = resultArray.filter((elem) => elem !== "");

    return filterResult;
}


/****************************************************************************************
 * Overwrites all the data that currently exists in the file.
 * 
 * @param {string} taskData - The path to the file containing task data.
 * @param {string[]} arr - An array of tasks to be written to the file.
 ****************************************************************************************/
const overwriteData = (taskData, arr) => {
    arr.push("");
    const enterTask = arr.join("\n");
    try {
        fs.writeFileSync(taskData, enterTask);
    } 
    catch (error) {
        console.log(error);
    }
}


/****************************************************************************************
 * Add a new task.
 * 
 * @param {string} taskData - The path to the file containing task data.
 * @param {string} enterTask - The task to be added.
 ****************************************************************************************/
const addTask = (taskData, enterTask) => {
    try {
        fs.appendFileSync(taskData, `${enterTask} \n`);
        console.log("Task Added Successfully!");
    } 
    catch (error) {
        console.log(error);
    }
}
// addTask(taskData, "this is Task-1.");
// addTask(taskData, "this is Task-2.");


/***************************************************************************************
 * Reads task from the specified file.
 * 
 * @param {string} taskData - The path to the file containing task data.
 * @returns {string} The task data.
 ***************************************************************************************/
const readTask = (taskData) => {
    try {
        const data = fs.readFileSync(taskData, {encoding: "utf-8"});
        return data;
    } 
    catch (error) {
        console.log(error);
        return null;
    }
}
// const readDataTask = readTask(taskData);
// console.log(readDataTask);


/*****************************************************************************************
 * Marks a task as complete.
 * 
 * @param {string} taskData - The path to the file containing task data.
 * @param {string} taskName - The name of the task to mark as complete.
 *****************************************************************************************/
const markedAsTaskComplete = (taskData, taskName) => {
    const data = taskArray(taskData);
 
    const mapResult = data.map((elem) => {
     if(elem.trim() === taskName.trim()){
         const taskComplete = `[${taskName}] - Task-Completed`;
         return taskComplete;
     }
     return elem;
    })
    overwriteData(taskData, mapResult)
 }
  
//  addTask(taskData, "Task-Mark");
//  markedAsTaskComplete(taskData, "Task-Mark");
//  const readData = readTask(taskData);
//  console.log(readData);
 
/*****************************************************************************************
 * Deletes a task.
 * 
 * @param {string} taskData - The path to the file containing task data.
 * @param {string} taskName - The name of the task to delete.
 *****************************************************************************************/
const deleteTask = (taskData, taskName) => {
    const data = taskArray(taskData);

    // const trimTaskName = taskName.trim().toLowerCase();

    const filterResult = data.filter((elem) => elem.trim().toLocaleLowerCase() !== taskName.trim().toLowerCase());

    overwriteData(taskData, filterResult);
    console.log("Task Deleted Successfully!");
    
}
deleteTask(taskData, "Task to Delete");


