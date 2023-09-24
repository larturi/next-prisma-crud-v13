import { NextResponse } from "next/server";
import { prisma } from '@/libs/prisma'

export async function GET(request, {params}) {
    const task = await prisma.task.findUnique({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json(task)
}

export async function PUT(request, {params}) {
    const data = await request.json()
    try {
        const taskUpdated = await prisma.task.update({
            where: {
                id: Number(params.id)
            },
            data: data
        })
        return NextResponse.json(taskUpdated)
    } catch (error) {
        return NextResponse.json({
            error: true,
            message: error.message
        })
    }
}

export async function DELETE(request, {params}) {
    try {
        const taskDeleted = await prisma.task.delete({
            where: {
                id: Number(params.id)
            }
        })
        return NextResponse.json(taskDeleted)
    } catch (error) {
        return NextResponse.json({
            error: true,
            message: error.message
        })
    }
}