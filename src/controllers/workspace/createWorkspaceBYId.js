import mongoose from 'mongoose';
import Workspace from '../../models/workspace.model';
async function createWorkspaceById(req,res){
   const{name,description,members} = req.body

  const workspace =  await Workspace.create({})
}

export default createWorkspaceById;