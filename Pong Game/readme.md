let leftPaddleBounds=leftPaddleBounds.getBoundingClientRect();
let rightPaddleBounds=rightPaddleBounds.getBoundingClientRect();
if(ballLeft<=leftPaddleBounds.right&&ballRight>=leftPaddleBounds.left&&ballTop+30<=leftPaddleBounds.top&&ballBottom-30>=leftPaddleBounds.bottom)
{
    x=!x;
}