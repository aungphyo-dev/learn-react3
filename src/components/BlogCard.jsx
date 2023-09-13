import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {Link} from "react-router-dom";

export default function BlogCard({blog}) {
    return (
        <Link to={`/detail/${blog.id}`}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={blog.image}
                        alt="green iguana"
                        className={"block w-full h-[200px] object-fill"}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" className={"truncate font-bold"} component="div">
                            {blog.title}
                        </Typography>
                        <Typography variant="body2" className={"truncate"} color="text.secondary">
                            {blog.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
}