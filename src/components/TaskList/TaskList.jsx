import React from 'react';
import AcceptTask from './AcceptTask';
import NewTask from './NewTask';
import CompleteTask from './CompleteTask';
import FailedTask from './FailedTask';

const TaskList = ({ data }) => {
  const empId = data.id;

  return (
    <div
      id="tasklist"
      className="mt-14 mb-16 flex flex-col sm:flex-row gap-6 sm:overflow-x-auto overflow-y-auto scrollbar-hide px-2 py-1 "
 >
      {data.tasks?.map((elem, idx) => { 
        let Card = null;
        if (elem.newTask === true) {
          Card = NewTask;
        } else if (elem.active === true) {
          Card = AcceptTask;
        } else if (elem.completed === true) {
          Card = CompleteTask;
        } else if (elem.failed === true) {
          Card = FailedTask;
        }

        return Card ? (
          <div
            key={idx}
            className="flex-shrink-0 scroll-snap-align-start"
            style={{ minWidth: '300px' }}
          >
            <Card data={elem} empId={empId} taskIndex={idx} />
          </div>
        ) : null;
      })}
    </div>
  );
};

export default TaskList;
