type LockedContextParams = {
    skillLabel: string;
    topicLabel: string;
    onSubmit?: () => void;
};

type TopicCompletionContext = {
    exists: boolean;
    done: boolean;
    skillLabel: string;
    topicLabel: string;
};

type UseTopicCompletionToggleParams<TId> = {
    getContext: (target: TId) => TopicCompletionContext;
    onMarkIncomplete: (target: TId) => void;
    onMarkComplete: (target: TId) => void;
    openWithLockedContext: (params: LockedContextParams) => void;
};

export function useTopicCompletionToggle<TId>({
    getContext,
    onMarkIncomplete,
    onMarkComplete,
    openWithLockedContext
}: UseTopicCompletionToggleParams<TId>) {
    const toggleTopic = (target: TId) => {
        const context = getContext(target);

        if (!context.exists) {
            return;
        }

        if (context.done) {
            onMarkIncomplete(target);
            return;
        }

        openWithLockedContext({
            skillLabel: context.skillLabel,
            topicLabel: context.topicLabel,
            onSubmit: () => onMarkComplete(target)
        });
    };

    return { toggleTopic };
}
