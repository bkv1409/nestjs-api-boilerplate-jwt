import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ITask } from './interfaces/task.interface';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<ITask> {
    try {
      return await this.tasksRepository.save(createTaskDto);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }

  }

  async findAll(): Promise<ITask[]> {
    return await this.tasksRepository.find();
  }

  async findOne(id: number): Promise<ITask> {
    // return `This action returns a #${id} task`;
    const task = await this.tasksRepository.findOneBy({
      id: +id,
    });
    if (!task) {
      throw new NotFoundException(`Task #${id} not found`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<UpdateResult> {
    // return `This action updates a #${id} task`;

    try {
      return this.tasksRepository.update(id, {...updateTaskDto});
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: number): Promise<DeleteResult> {
    try {
      return this.tasksRepository.delete(id);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
