import React from 'react'

export default function Card({ data }) {
    
    return (
        <>
            {data.map((e,i) => {
                return <div className="card" key={i}>
                    <div className="card-content">
                        <div className="card-header">
                            {e.day}
                        </div>
                        <div className="card-body">
                            <img src={e.iconURL} alt="" />
                        </div>
                        <div className="card-footer">
                            Min: {e.min_temp.c}
                            Max: {e.max_temp.c}
                        </div>
                    </div>
                </div>
            })}

        </>
    )
}
