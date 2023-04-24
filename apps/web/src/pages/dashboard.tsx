import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

import { api, type RouterOutputs } from '~/utils/api';

const Dashboard: NextPage = () => {
  const { data: session, isFetched } = api.auth.getSession.useQuery();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const taskQuery = api.task.all.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const deleteTaskMutation = api.task.delete.useMutation({
    onSettled: () => taskQuery.refetch(),
  });

  useEffect(() => {
    if (isFetched) {
      if (!session || !session.user) {
        void router.push('/');
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [isFetched, session, setIsAuthenticated, router]);

  return (
    <>
      <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container mt-12 flex flex-col items-center justify-center gap-4 px-4 py-8">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-pink-400">T3</span> Turbo
          </h1>
          {isAuthenticated ? (
            <>
              <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-center text-2xl text-white">
                  {session && <span>Logged in as {session?.user?.name}</span>}
                </p>
                <button
                  className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                  onClick={() => void signOut({ callbackUrl: '/' })}
                >
                  Sign out
                </button>
              </div>
              <CreateTaskForm />
              {taskQuery.data ? (
                <div className="w-full max-w-2xl">
                  {taskQuery.data?.length === 0 ? (
                    <span>There are no tasks!</span>
                  ) : (
                    <div className="flex h-[40vh] justify-center overflow-y-scroll px-4 text-2xl">
                      <div className="flex w-full flex-col gap-4">
                        {taskQuery.data?.map((t) => {
                          return (
                            <TaskCard
                              key={t.id}
                              task={t}
                              onTaskDelete={() =>
                                deleteTaskMutation.mutate(t.id)
                              }
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </>
          ) : (
            <p>Loading</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Dashboard;

const TaskCard: React.FC<{
  task: RouterOutputs['task']['all'][number];
  onTaskDelete?: () => void;
}> = ({ task, onTaskDelete }) => {
  return (
    <div className="flex flex-row rounded-lg bg-white/10 p-4 transition-all hover:scale-[101%]">
      <div className="flex-grow">
        <h2 className="text-2xl font-bold text-pink-400">{task.title}</h2>
        <p className="mt-2 text-sm">{task.description}</p>
      </div>
      <div>
        <span
          className="cursor-pointer text-sm font-bold uppercase text-pink-400"
          onClick={onTaskDelete}
        >
          Delete
        </span>
      </div>
    </div>
  );
};

const CreateTaskForm: React.FC = () => {
  const utils = api.useContext();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { mutate, error } = api.task.create.useMutation({
    async onSuccess() {
      setTitle('');
      setDescription('');
      await utils.task.all.invalidate();
    },
  });

  return (
    <div className="flex w-full max-w-2xl flex-col p-4">
      <input
        className="mb-2 rounded bg-white/10 p-2 text-white"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      {error?.data?.zodError?.fieldErrors.title && (
        <span className="mb-2 text-red-500">
          {error.data.zodError.fieldErrors.title}
        </span>
      )}
      <input
        className="mb-2 rounded bg-white/10 p-2 text-white"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      {error?.data?.zodError?.fieldErrors.content && (
        <span className="mb-2 text-red-500">
          {error.data.zodError.fieldErrors.content}
        </span>
      )}
      <button
        className="rounded bg-pink-400 p-2 font-bold"
        onClick={() => {
          mutate({
            title,
            description,
          });
        }}
      >
        Create
      </button>
    </div>
  );
};