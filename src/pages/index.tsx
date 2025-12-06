import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ConfigsView } from '@/components/views/ConfigView';
import { PromptsView } from '@/components/views/PromptsView';
import { useStore } from '@/hooks/useStore';
import { ViewMode } from '@/types';

const Index = () => {
  const [activeView, setActiveView] = useState<ViewMode>('configs');
  const {
    folders,
    configs,
    prompts,
    addFolder,
    updateFolder,
    deleteFolder,
    addConfig,
    updateConfig,
    deleteConfig,
    getConfigsByFolder,
    addPrompt,
    updatePrompt,
    deletePrompt,
  } = useStore();

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      <div className="flex-1 flex flex-col relative">
        {activeView === 'configs' ? (
          <ConfigsView
            folders={folders}
            configs={configs}
            onAddFolder={addFolder}
            onUpdateFolder={updateFolder}
            onDeleteFolder={deleteFolder}
            onAddConfig={addConfig}
            onUpdateConfig={updateConfig}
            onDeleteConfig={deleteConfig}
            getConfigsByFolder={getConfigsByFolder}
          />
        ) : (
          <PromptsView
            prompts={prompts}
            onAddPrompt={addPrompt}
            onUpdatePrompt={updatePrompt}
            onDeletePrompt={deletePrompt}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
