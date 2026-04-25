type LogItem = {
  id: string;
  message: string;
  time: string;
};

let logs: LogItem[] = [];

export const addLog = (message: string) => {
  const newLog: LogItem = {
    id: Date.now().toString(),
    message,
    time: new Date().toLocaleString(),
  };

  logs = [newLog, ...logs];
};

export const getLogs = () => logs;