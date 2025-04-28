<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//Use Models
use App\Models\Fasum;
use Yajra\DataTables\Facades\DataTables;
use File;

class AdminFasumController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('is_admin');
    }


    public function getFormSchema()
    {
        $fasum = new Fasum();

        return response()->json([
            'fillable' => $fasum->getFillable(),
            'fieldTypes' => $fasum->getField() // asumsi ini array field => type
        ]);
    }
    public function json()
    {
        $data = Fasum::select('*')
                ->orderby('nama', 'ASC')
                ->get()->map(function ($item, $index) {
                    $item->DT_RowIndex = $index + 1;
                    return $item;
                });

        return response()->json($data);
    }

    public function find($id)
    {
        // Mengambil data anime berdasarkan ID
        $fasum = Fasum::find($id);
        if ($fasum) {
            return response()->json($fasum);
        } else {
            return response()->json(['message' => 'Fasum not found'], 404);
        }
    }

    //CRUD
    public function update(Request $request, $id)
    {
        // Validasi data masuk
        $validator = Fasum::validate($request->all());

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $fasum = Fasum::findOrFail($id);
        $fillableFields = (new Fasum())->getFillable();

        // Update field lainnya yang boleh diisi
        $fasum->fill($request->only($fillableFields));

        // Handle file cover_image jika ada
        if ($request->file('cover_image')) {
            $file = $request->file('cover_image');
            $ext = $file->getClientOriginalExtension();

            // Generate nama file
            $filename = $request->nama . '.' . $ext;

            // Hapus file lama jika ada
            $this->image_destroy($filename); // Nama file lama

            // Simpan file baru ke disk 'img_fasum'
            $file->storeAs('/fasum', $filename, ['disk' => 'img_upload']);

            // Simpan nama file ke model
            $fasum->cover_image = $filename;
        }

        $fasum->save();

        return response()->json([
            'message' => 'Data updated successfully',
            'result' => $fasum
        ], 200);
    }

    public function store(Request $request)
    {
        // Validate the incoming request
        $validator =  Fasum::validate($request->all());

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $fasum = new Fasum();

        $fillAble = (new Fasum())->getFillable();
        // Update field lainnya yang boleh diisi
        $fasum->fill($request->only($fillAble));

        // Handle file cover_image jika ada
        if ($request->file('cover_image')) {
            $file = $request->file('cover_image');
            $ext = $file->getClientOriginalExtension();

            // Generate nama file
            $filename = $request->nama . '.' . $ext;

            // Hapus file lama jika ada
            $this->image_destroy($filename); // Nama file lama

            // Simpan file baru ke disk 'img_fasum'
            $file->storeAs('/fasum', $filename, ['disk' => 'img_upload']);

            // Simpan nama file ke model
            $fasum->cover_image = $filename;
        } else {
            $fasum->cover_image =  'none.jpg';
        }

        $fasum->save();

        return response()->json(['message' => 'Data created successfully', 'result' => $fasum], 201);
    }

    public function destroy($id)
    {
        $rows = Fasum::findOrFail($id);
        $result = $rows->delete();

        return response()->json(['message' => 'Data deleted successfully', 'result' => $result], 201);
    }
}
