const StatusButton = ({ status }) => {
    const getStatusClass = () => {
        if (status === 'ongoing') return 'btn btn-warning col-6';
        if (status === 'completed') return 'btn btn-success col-6';
        return 'btn btn-secondary col-6';
    };

    const getLabel = () => {
        if (status === 'ongoing') return 'Ongoing';
        if (status === 'completed') return 'Completed';
        return 'Unknown';
    };

    return <button className={getStatusClass()}>{getLabel()}</button>;
};

export default StatusButton;
