import React, { useState } from 'react'
import { Pagination, PaginationItem, PaginationLink  } from 'reactstrap'
import '../views.scss'
const Paginations = ({ postsPerPage, totalPosts, paginate }) => {
    const [actives, setActives] = useState(false)
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }
    

    return (
        <div>
            <Pagination size="md" aria-label="Page navigation example" className="paginations">
                <PaginationItem>
                    <PaginationLink previous href="#" />
                </PaginationItem>
                {pageNumbers?.map((number, index) => (
                    <PaginationItem key={index} onClick={() => paginate(number)}>
                        <PaginationLink > 
                            {number}
                        </PaginationLink>
                    </PaginationItem>
                ))
                }
                <PaginationItem>
                    <PaginationLink next href="#" />
                </PaginationItem>
            </Pagination>
        </div>
    )
}

export default Paginations