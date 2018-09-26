<?php

use Illuminate\Database\Seeder;

use App\CaseLogDetailsSchema;

class CaseLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		// FIXME: This isn't good
		CaseLogDetailsSchema::create([
			'details_type' => 'raaps',
			'version' => 1,
			'schema' => [
				"title" => "RAAPS Case Log",
				"sections" => [
					[
						"items" => [
							[
								"type" => "select",
								"text" => "Case type",
								"required" => true,
								"id" => "case-type",
								"options" => [
									[
										"text" => "Neuraxial",
										"value" => "neuraxial"
									],
									[
										"text" => "Peripheral",
										"value" => "peripheral"
									],
									[
										"text" => "Acute pain consult",
										"value" => "acute-pain-consult"
									]
								]
							],
							[
								"type" => "radio",
								"text" => "Patient type",
								"id" => "patient-type",
								"options" => [
									[
										"text" => "Pediatric",
										"value" => "pediatric"
									],
									[
										"text" => "Trauma",
										"value" => "trauma"
									]
								]
							]
						]
					],
					[
						"direction" => "horizontal",
						"condition" => [
							"questionId" => "case-type",
							"questionValue" => [
								"neuraxial",
								"peripheral"
							]
						],
						"items" => [
							[
								"type" => "radio",
								"text" => "Procedure involvement",
								"id" => "procedure-involvement",
								"required" => true,
								"options" => [
									[
										"text" => "Performed",
										"value" => "performed"
									],
									[
										"text" => "Supervised",
										"value" => "supervised"
									]
								]
							],
							[
								"type" => "checkbox",
								"text" => "Guidance technique",
								"id" => "guidance-technique",
								"options" => [
									[
										"text" => "Ultrasound",
										"value" => "ultrasound"
									],
									[
										"text" => "Nerve Stimulator",
										"value" => "nerve-stimulator"
									]
								]
							]
						]
					],
					[
						"title" => "Neuraxial",
						"condition" => [
							"questionId" => "case-type",
							"questionValue" => "neuraxial"
						],
						"items" => [
							[
								"type" => "radio",
								"text" => "Neuraxial type",
								"required" => true,
								"id" => "neuraxial-type",
								"options" => [
									[
										"text" => "Epidural",
										"value" => "epidural"
									],
									[
										"text" => "CSE",
										"value" => "cse"
									],
									[
										"text" => "Spinal",
										"value" => "spinal"
									]
								]
							],
							[
								"type" => "checkbox",
								"text" => "Blockade site",
								"required" => true,
								"id" => "neauraxial-blockade-site",
								"options" => [
									[
										"text" => "Caudal",
										"value" => "caudal"
									],
									[
										"text" => "Cervical",
										"value" => "cervical"
									],
									[
										"text" => "Lumbar",
										"value" => "lumbar"
									],
									[
										"text" => "T 1-7",
										"value" => "t1-7"
									],
									[
										"text" => "T 8-12",
										"value" => "t8-12"
									]
								]
							]
						]
					],
					[
						"title" => "Peripheral",
						"condition" => [
							"questionId" => "case-type",
							"questionValue" => "peripheral"
						],
						"items" => [
							[
								"type" => "checkbox",
								"text" => "Nerve block type",
								"id" => "peripheral-block-type",
								"options" => [
									[
										"text" => "Continuous",
										"value" => "continuous"
									],
									[
										"text" => "Single-shot",
										"value" => "single-shot"
									],
									[
										"text" => "Bilateral",
										"value" => "bilateral"
									]
								]
							],
							[
								"type" => "checkbox",
								"text" => "Blockade site",
								"id" => "peripheral-blockade-site",
								"required" => true,
								"options" => [
									[
										"text" => "Ankle",
										"value" => "ankle"
									],
									[
										"text" => "Axillary",
										"value" => "axillary"
									],
									[
										"text" => "Fascia Iliaca",
										"value" => "fascia-iliaca"
									],
									[
										"text" => "Femoral",
										"value" => "femoral"
									],
									[
										"text" => "Infraclavicular",
										"value" => "infraclavicular"
									],
									[
										"text" => "Interscalene",
										"value" => "interscalene"
									],
									[
										"text" => "Lumbar Plexus",
										"value" => "lumbar-plexus"
									],
									[
										"text" => "Paravertebral",
										"value" => "paravertebral"
									],
									[
										"text" => "Pectoral Block",
										"value" => "pectoral-block"
									],
									[
										"text" => "Popliteal",
										"value" => "popliteal"
									],
									[
										"text" => "Quadratus Lumborum",
										"value" => "quadratus-lumborum"
									],
									[
										"text" => "Rectus Sheath",
										"value" => "rectus-sheath"
									],
									[
										"text" => "Retrobulbar",
										"value" => "retrobulbar"
									],
									[
										"text" => "Saphenous",
										"value" => "saphenous"
									],
									[
										"text" => "Sciatic",
										"value" => "sciatic"
									],
									[
										"text" => "Supraclavicular",
										"value" => "supraclavicular"
									],
									[
										"text" => "TAP",
										"value" => "tap"
									],
									[
										"text" => "",
										"value" => "",
										"editable" => true
									]
								]
							]
						]
					]
				]
			]
		]);
    }
}
