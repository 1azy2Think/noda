interface EmptyPageProps {
    description?: any;
}

const EmptyPage: React.FC<EmptyPageProps> = ({description=""}) => { return (<>{description}</>) }

export default EmptyPage;