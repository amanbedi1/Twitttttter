import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import { Card, Divider, InputAdornment, List, ListItem, ListItemText, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Search = ()=>{

    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        fetch('/allusers', {
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then((result) => {
            setData(result.users)
            console.log(result.users)
        })
    }, [])

    const fetchUsers = (query) => {
        setSearch(query)
        if(query!=="") {
            const result = []
            data.map((item) => {
                if((item.email).includes(query) || (item.name).includes(query)) {
                    result.push(item)
                }
            })
            setSearchResult(result)
        }
        else {
            setSearchResult([])
        }
    }

    return (
        <Container>
            <Row className="justify-content-center mb-3">
                <div className="col-12 col-md-6">
                    <Card className="p-4">
                        <TextField
                            id="input-with-icon-textfield"
                            label="Search Users"
                            value={search}
                            onChange={(e)=>fetchUsers(e.target.value)}
                            fullWidth
                            InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            }}
                        />
                    </Card>
                </div>
            </Row>
            <Row className="justify-content-center">
                <div className="col-12 col-md-6">
                    <Card>
                        <List>
                            {searchResult.map((item, index) => {
                                const link = "/profile/"+item._id
                                return (
                                    <div id="index">
                                        <Divider/>
                                        <Link to={link}>
                                            <ListItem>
                                                <ListItemText primary={item.name}/>
                                            </ListItem>
                                        </Link>
                                    </div>
                                )
                            })}
                        </List>
                    </Card>
                </div>
            </Row>
        </Container>
    );
}

export default Search;