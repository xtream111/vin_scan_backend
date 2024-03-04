CREATE TABLE ServiceCampaigns(
	id BIGSERIAL,
	CampaignID VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
	CampaignName VARCHAR(255) NOT NULL,
	TotalAffectedVehicles INT,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
	
);

CREATE TABLE VehicleCampaigns(
	id BIGSERIAL,
	VIN VARCHAR(255) PRIMARY KEY,
	model VARCHAR(255),
	CampaignID VARCHAR(255) NOT NULL,
	FOREIGN KEY (CampaignID) REFERENCES servicecampaigns(CampaignID),
	completed BOOLEAN NOT NULL DEFAULT 'FALSE',
	completed_at TIMESTAMP(0) NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
	
);