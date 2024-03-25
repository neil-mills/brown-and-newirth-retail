import { TitleBar } from './TitleBar'

export const FilterGridSkeleton = () => {
  return (
    <div className="mb-225rem">
      <TitleBar>
        <span style={{ visibility: 'hidden' }}>XXXX</span>
      </TitleBar>
      <div className="row row-pad-sm row-panels-sm justify-content-center">
        <div className="col-fifth col-pad-sm col-panel-sm col-panel-sm">
          <div
            style={{ height: '139px' }}
            className="btn btn-icon bg-gradient-grey w-100"
          ></div>
        </div>
        <div className="col-fifth col-pad-sm col-panel-sm col-panel-sm">
          <div
            style={{ height: '139px' }}
            className="btn btn-icon bg-gradient-grey w-100"
          ></div>
        </div>
        <div className="col-fifth col-pad-sm col-panel-sm col-panel-sm">
          <div
            style={{ height: '139px' }}
            className="btn btn-icon bg-gradient-grey w-100"
          ></div>
        </div>
        <div className="col-fifth col-pad-sm col-panel-sm col-panel-sm">
          <div
            style={{ height: '139px' }}
            className="btn btn-icon bg-gradient-grey w-100"
          ></div>
        </div>
      </div>
    </div>
  )
}
