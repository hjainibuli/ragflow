import { useTestRetrieval } from '@/hooks/use-knowledge-request';
import { t } from 'i18next';
import { useState } from 'react';
import { TopTitle } from '../dataset-title';
import TestingForm from './testing-form';
import { TestingResult } from './testing-result';

export default function RetrievalTesting() {
  const {
    loading,
    setValues,
    refetch,
    data,
    onPaginationChange,
    page,
    pageSize,
    handleFilterSubmit,
    filterValue,
  } = useTestRetrieval();

  const [count] = useState(1);

  return (
    <div className="patriotic-dataset-testing p-5 h-full flex flex-col">
      <section className="flex justify-between items-center mb-4">
        <TopTitle
          title={t('knowledgeDetails.retrievalTesting')}
          description={t('knowledgeDetails.testingDescription')}
        ></TopTitle>
        {/* <Button>Save as Preset</Button> */}
      </section>
      {count === 1 ? (
        <section className="testing-layout flex gap-6 flex-1 min-h-0">
          <div className="testing-form-panel p-4 flex-1 min-h-0 flex flex-col">
            <div className="flex justify-between pb-2.5">
              <span className="text-text-primary font-semibold text-2xl">
                {t('knowledgeDetails.testSetting')}
              </span>
              {/* <Button variant={'outline'} onClick={addCount}>
                <Plus /> Add New Test
              </Button> */}
            </div>
            <div className="h-[calc(100vh-241px)] overflow-auto scrollbar-thin px-1">
              <TestingForm
                loading={loading}
                setValues={setValues}
                refetch={refetch}
              ></TestingForm>
            </div>
          </div>
          <div className="testing-result-panel flex-1 min-h-0">
            <TestingResult
              data={data}
              page={page}
              loading={loading}
              pageSize={pageSize}
              filterValue={filterValue}
              handleFilterSubmit={handleFilterSubmit}
              onPaginationChange={onPaginationChange}
            ></TestingResult>
          </div>
        </section>
      ) : (
        <section className="testing-layout flex gap-4 flex-1 min-h-0">
          <div className="testing-form-panel flex-1 min-h-0 flex flex-col">
            <TestingForm
              loading={loading}
              setValues={setValues}
              refetch={refetch}
            ></TestingForm>
            <TestingResult
              data={data}
              page={page}
              loading={loading}
              pageSize={pageSize}
              filterValue={filterValue}
              handleFilterSubmit={handleFilterSubmit}
              onPaginationChange={onPaginationChange}
            ></TestingResult>
          </div>
          <div className="testing-form-panel flex-1 min-h-0 flex flex-col">
            <TestingForm
              loading={loading}
              setValues={setValues}
              refetch={refetch}
            ></TestingForm>
            <TestingResult
              data={data}
              page={page}
              loading={loading}
              pageSize={pageSize}
              filterValue={filterValue}
              handleFilterSubmit={handleFilterSubmit}
              onPaginationChange={onPaginationChange}
            ></TestingResult>
          </div>
        </section>
      )}
    </div>
  );
}
